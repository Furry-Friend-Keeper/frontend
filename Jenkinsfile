pipeline {
  agent any

  stages {

    stage("build") {
        steps {
          echo 'build'
      }
    }
    stage("test") {
        steps {
          echo 'test'
          sh 'java -version'
      }
    }
    stage("deploy") {
        steps {
          echo 'deploy'
          sh 'pwd'
      }
    }
  }
}
