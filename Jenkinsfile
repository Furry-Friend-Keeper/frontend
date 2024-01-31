pipeline {
  agent any

  stages {

    stage("build") {
        steps {
          echo 'buildasda'
          sh 'java -version'
      }
    }
    stage("test") {
        steps {
          echo 'test'
      }
    }
    stage("deploy") {
        steps {
          echo 'deploy'
          sh 'cd'
          sh 'rm -r test'          
      }
    }
  }
}
