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
      }
      post {
        always {
          recordIssues enabledForFailure: true, aggregatingResults: true, tool: esLint(pattern: 'eslint.xml')
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
