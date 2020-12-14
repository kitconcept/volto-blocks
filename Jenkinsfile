#!groovy

pipeline {

  agent {
    label 'docker'
  }

  environment {
        GIT_NAME = "volto-blocks"
        NAMESPACE = "kitconcept"
        DEPENDENCIES = ""
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

    stage('Unit tests') {
      steps {
        sh '''docker pull plone/volto-addon-ci'''
        sh '''docker run -i --name="$BUILD_TAG-volto" -e NAMESPACE="$NAMESPACE" -e DEPENDENCIES="$DEPENDENCIES" -e GIT_NAME=$GIT_NAME -v $(pwd):/opt/frontend/my-volto-project/src/addons/$GIT_NAME plone/volto-addon-ci test'''
        sh '''mkdir -p xunit-reports'''
        sh '''docker cp $BUILD_TAG-volto:/opt/frontend/my-volto-project/coverage xunit-reports/'''
        sh '''docker cp $BUILD_TAG-volto:/opt/frontend/my-volto-project/junit.xml xunit-reports/'''
        sh '''docker cp $BUILD_TAG-volto:/opt/frontend/my-volto-project/unit_tests_log.txt xunit-reports/'''
        stash name: "xunit-reports", includes: "xunit-reports/**/*"
      }
      post {
        always {
          sh '''docker rm -v $BUILD_TAG-volto'''
          unstash 'xunit-reports'
          junit 'xunit-reports/junit.xml'
          archiveArtifacts artifacts: 'xunit-reports/unit_tests_log.txt', fingerprint: true
          archiveArtifacts artifacts: 'xunit-reports/coverage/lcov.info', fingerprint: true
          publishHTML (target : [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'xunit-reports/coverage/lcov-report',
            reportFiles: 'index.html',
            reportName: 'UTCoverage',
            reportTitles: 'Unit Tests Code Coverage'
          ])
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
