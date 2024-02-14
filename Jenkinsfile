pipeline {
    agent any
  
    stages {
        stage('Build') {
            steps {
                script {
                    echo "INFO: Clear image+container | Build frontend image"
                    sh "docker rmi frontendimg || true"
                    sh "docker container rm -f frontend || true"
                    sh "docker network rm FFK-network || true"
                    sh "docker build -t frontendimg ./frontend"
                    sh "docker network create FFK-network || true"
                    echo "INFO: Finish build frontend image"
                }
            }
        }
       stage('Deploy') {
            steps {
                script {
                    echo "INFO: Deploy frontend container"
                    sh "docker run -d --name frontend --network FFK-network -p 3000:80 --restart on-failure frontendimg"
                    echo "INFO: Finish deploy frontend container"
                }
            }
        }
    }
}
