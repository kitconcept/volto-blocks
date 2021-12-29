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
            sh 'tar cfz build.tgz --exclude=node-jq addon-testing-project'
            stash includes: 'build.tgz', name: 'build.tgz'
          }
      }
    }

    // Static Code Analysis
    stage('Static Code Analysis') {
      parallel {
        stage('ESlint') {
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn lint:ci'
          }
          post {
            always {
              recordIssues enabledForFailure: true, aggregatingResults: true, tool: esLint(pattern: 'eslint.xml')
            }
          }
        }
        stage('stylelint') {
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn stylelint'
          }
        }
        stage('Prettier') {
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && yarn prettier:ci'
          }
        }
      }
    }

    stage('Tests') {
      parallel {
        stage('Unit tests') {
          steps {
            deleteDir()
            unstash 'build.tgz'
            sh 'tar xfz build.tgz'
            sh 'cd addon-testing-project && CI=true yarn test'
          }
          post {
            always {
              step([
                $class: 'JUnitResultArchiver',
                testResults: 'junit.xml'
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
            sh 'cd addon-testing-project && yarn ci:cypress:run'
          }
          post {
            always {
              archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', fingerprint: true, allowEmptyArchive: true
              archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true, allowEmptyArchive: true
              junit 'results/cypress-report-*.xml'
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
