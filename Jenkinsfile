#!groovy

pipeline {

  agent {
    label 'docker'
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
    stage('Static Code Analysis') {
      parallel {
        stage('ESlint') {
          steps {
            deleteDir()
            checkout scm
            sh '''yarn bootstrap'''
            sh '''yarn lint'''
          }
        }
        stage('stylelint') {
          steps {
            deleteDir()
            checkout scm
            sh '''yarn bootstrap'''
            sh '''yarn stylelint'''
          }
        }
        stage('Prettier') {
          steps {
            deleteDir()
            checkout scm
            sh '''yarn bootstrap'''
            sh '''yarn prettier'''
          }
        }
      }
    }
    stage('Tests') {
      parallel {
        stage('Unit tests') {
          steps {
            deleteDir()
            checkout scm
            sh '''yarn bootstrap'''
            sh '''CI=true yarn test'''
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
          steps {
            deleteDir()
            checkout scm
            sh 'yarn bootstrap'
            sh 'yarn ci:cypress'
          }
          post {
            always {
              archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', fingerprint: true, allowEmptyArchive: true
              archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true, allowEmptyArchive: true
              junit 'results/cypress-report-*.xml'
            }
          }
          // post {
          //   always {
          //     sh '''mkdir -p cypress-reports'''
          //     sh '''docker cp $BUILD_TAG-cypress:/opt/frontend/my-volto-project/src/addons/$GIT_NAME/cypress/videos cypress-reports/'''
          //     stash name: "cypress-reports", includes: "cypress-reports/**/*"
          //     archiveArtifacts artifacts: 'cypress-reports/videos/*.mp4', fingerprint: true
          //     sh '''echo "$(docker stop $BUILD_TAG-plone; docker rm -v $BUILD_TAG-plone; docker rm -v $BUILD_TAG-cypress)" '''
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
