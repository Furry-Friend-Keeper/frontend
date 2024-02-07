pipeline {
    agent any
  
    stages {
        stage('Pull From Git') {
            steps {
                git branch: 'main', url: 'https://github.com/Furry-Friend-Keeper/frontend.git'
            }
        }
       stage('Docker Compose') {
            steps {
                sh 'sudo docker compose up --build -d'
            }
        }
        stage('Success') {
            steps {
                echo 'Deploy Successfully'
            }
        }
    }
}
