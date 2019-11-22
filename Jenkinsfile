#!groovy

pipeline {

  agent {
    label 'node'
  }

  options {
    buildDiscarder(logRotator(numToKeepStr:'20'))
    skipDefaultCheckout()
    disableConcurrentBuilds()
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {
    // Static Code Analysis
    stage('Static Code Analysis') {
      steps {
        deleteDir()
        checkout scm
        sh 'yarn'
        sh 'yarn prettier'
        sh 'yarn ci:lint'
        sh 'cat eslint.xml'
      }
      post {
        always {
          recordIssues enabledForFailure: true, aggregatingResults: true, tool: esLint(pattern: 'eslint.xml')
        }
      }
    }

    // -- UNIT TESTS ---
    stage('Unit Tests') {
      parallel {
        stage('Backend') {
          agent {
            label 'node'
          }
          steps {
            deleteDir()
            unstash 'backend.tgz'
            sh 'tar xfz backend.tgz'
            sh "make test-backend"
          }
          post {
            always {
              step([
                $class: 'JUnitResultArchiver',
                testResults: 'api/parts/test/testreports/*.xml'
              ])
            }
          }
        }
        stage('Frontend') {
          agent {
            label 'node'
          }
          steps {
            deleteDir()
            unstash 'frontend.tgz'
            sh 'tar xfz frontend.tgz'
            sh "CI=true make test-frontend"
          }
          // post {
          //   always {
          //     step([
          //       $class: 'JUnitResultArchiver',
          //       testResults: 'junit.xml'
          //     ])
          //   }
          // }
        }
      }
    }

    // Acceptance Tests
    // stage('Acceptance Tests') {
    //   agent {
    //     label 'node'
    //   }
    //   steps {
    //     deleteDir()
    //     unstash 'backend.tgz'
    //     sh 'tar xfz backend.tgz'
    //     unstash 'frontend.tgz'
    //     sh 'tar xfz frontend.tgz'
    //     sh 'yarn cy:install'
    //     wrap([$class: 'Xvfb']) {
    //       sh 'yarn ci:cypress:run'
    //     }
    //   }
    //   post {
    //     always {
    //       archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', fingerprint: true, allowEmptyArchive: true
    //       archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true, allowEmptyArchive: true
    //       junit 'results/cypress-report-*.xml'
    //     }
    //   }
    // }

    // --- DEPLOYMENT TO brh.kitconcept.io ---
    stage('Deployment to brh.kitconcept.io') {
      agent {
        label 'kitconcept.io'
      }
      when {
        branch 'volto'
      }
      steps {
        // Backend
        sh '(ssh brh.kitconcept.io "cd /srv/brh.kitconcept.io && git fetch --all && git reset --hard origin/volto")'
        sh '(ssh brh.kitconcept.io "pm2 stop brh-api-staging")'
        sh '(ssh brh.kitconcept.io "cd /srv/brh.kitconcept.io && make build-backend-staging")'
          // Remove DB and link to the migrated one
        sh '(ssh brh.kitconcept.io "rm -rf /srv/brh.kitconcept.io/api/var/filestorage && rm -rf /srv/brh.kitconcept.io/api/var/blobstorage")'
        sh 'ssh brh.kitconcept.io "ln -sf /srv/db-brh.kitconcept.io/var/filestorage /srv/brh.kitconcept.io/api/var/ && ln -sf /srv/db-brh.kitconcept.io/var/blobstorage /srv/brh.kitconcept.io/api/var/"'
        sh '(ssh brh.kitconcept.io "pm2 start brh-api-staging")'
        // Frontend
        sh '(ssh brh.kitconcept.io "cd /srv/brh.kitconcept.io && yarn")'
        sh '(ssh brh.kitconcept.io "cd /srv/brh.kitconcept.io && PORT=11001 RAZZLE_API_PATH=https://brh.kitconcept.io/api yarn build")'
        sh '(ssh brh.kitconcept.io "pm2 restart brh-volto-staging")'
      }
    }

    // --- DEPLOYMENT TO brh-internet.kitconcept.dev ---
    stage('Deployment to brh-internet.kitconcept.dev') {
      agent {
        label 'kitconcept.io'
      }
      when {
        branch 'volto'
      }
      steps {
        // Backend
        sh '(cd /srv/brh-internet.kitconcept.dev && git fetch --all && git reset --hard origin/volto)'
        sh '(pm2 stop brh-internet-dev-api && cd /srv/brh-internet.kitconcept.dev && make build-backend-dev && pm2 start brh-internet-dev-api)'
        // Frontend
        sh '(cd /srv/brh-internet.kitconcept.dev && yarn)'
        sh '(cd /srv/brh-internet.kitconcept.dev && PORT=11008 RAZZLE_API_PATH=https://brh-internet.kitconcept.dev/api yarn build)'
        sh 'pm2 restart brh-internet-dev-volto'
      }
    }

    // Performance Tests
    stage('Performance Tests') {
      parallel {
        stage('Lighthouse') {
          agent {
            label 'node'
          }
          when {
            branch 'master'
          }
          steps {
            deleteDir()
            checkout scm
            sh 'yarn install'
            sh 'yarn run lighthouse:ci'
            sh 'cat lighthouse-report.html | true'
          }
          // post {
          //   always {
          //     publishHTML (target: [
          //       allowMissing: false,
          //       alwaysLinkToLastBuild: false,
          //       keepAll: true,
          //       reportDir: '.',
          //       reportFiles: 'lighthouse-report.html',
          //       reportName: "Lighthouse"
          //     ])
          //   }
          // }
        }
      }
    }

  }

  post {
    success {
      slackSend (
        color: 'good',
        message: "SUCCESS: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    failure {
      slackSend (
        color: 'danger',
        message: "FAILURE: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    unstable {
      slackSend (
        color: 'warning',
        message: "UNSTABLE: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    aborted {
      slackSend (
        color: 'danger',
        message: "ABORTED: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    always {
      sh 'rm -rf node_modules *.tgz'
    }
  }
}
