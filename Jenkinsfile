pipeline {
  agent any

  stages {

    stage("build") {
        steps {
          echo 'buildasda'
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
          sh 'sudo docker compose up -d --build'
      }
    }
  }
}
