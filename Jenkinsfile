#!groovy

pipeline {

  agent {
    label 'node'
  }

  environment {
        GIT_NAME = "volto-blocks"
        NAMESPACE = "@kitconcept"
        DEPENDENCIES = ""
  }

  options {
    buildDiscarder(logRotator(numToKeepStr:'20'))
    skipDefaultCheckout()
    disableConcurrentBuilds()
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {
    stage('Build') {
      steps {
        withCredentials([
          string(credentialsId: 'kitconcept_github_token_vault',
            variable: 'GITHUB_TOKEN')
          ]) {
            deleteDir()
            checkout scm
            sh '''npm i yo @plone/generator-volto'''
            sh 'export PATH=$(pwd)/node_modules/.bin:$PATH'
            sh '''npx -p @plone/scripts addon clone git@github.com:kitconcept/${GIT_NAME}.git --private --branch $BRANCH_NAME'''
            // copy special mrs.developer.json for handling inner packages
            sh 'cp mrs.developer.json addon-testing-project/.'
            sh 'cp packagesSupport.js addon-testing-project/.'
            sh '(cd addon-testing-project && node packagesSupport.js -a ${GIT_NAME} -b $BRANCH_NAME'
            // Run yarn again for changes to take effect
            sh 'cd addon-testing-project && yarn'
            sh 'tar cfz build.tgz --exclude=node-jq addon-testing-project'
            stash includes: 'build.tgz', name: 'build.tgz'
          }
      }
    }

    // Static Code Analysis
    stage('Static Code Analysis') {
      parallel {
        stage('ESlint') {
          agent {
            label 'node'
          }
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn && yarn lint:ci'
          }
          post {
            always {
              recordIssues enabledForFailure: true, aggregatingResults: true, tool: esLint(pattern: 'eslint.xml')
            }
          }
        }
        stage('stylelint') {
          agent {
            label 'node'
          }
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn && yarn stylelint'
          }
        }
        stage('Prettier') {
          agent {
            label 'node'
          }
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn && yarn prettier:ci'
          }
        }
      }
    }

    stage('Tests') {
      parallel {
        stage('Unit tests') {
          agent {
            label 'node'
          }
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn && CI=true yarn test'
          }
          post {
            always {
              step([
                $class: 'JUnitResultArchiver',
                testResults: 'addon-testing-project/junit.xml'
              ])
            }
          }
        }

        stage('Acceptance tests') {
          agent {
            label 'docker'
          }
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn --force && yarn ci:cypress:run'
          }
          post {
            always {
              archiveArtifacts artifacts: 'addon-testing-project/src/addons/volto-blocks/cypress/videos/**/*.mp4', fingerprint: true, allowEmptyArchive: true
              archiveArtifacts artifacts: 'addon-testing-project/src/addons/volto-blocks/cypress/screenshots/**/*.png', fingerprint: true, allowEmptyArchive: true
              junit 'addon-testing-project/src/addons/volto-blocks/results/cypress-report-*.xml'
            }
          }
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
