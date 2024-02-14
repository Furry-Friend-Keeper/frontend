pipeline {
    agent any
  
    stages {
        stage('Clear') {
            steps {
                script {
                    echo "INFO: Clear image, container"
                    sh "docker rmi frontendimg || true"
                    sh "docker container rm -f frontend || true"
                    echo "INFO: All clear!!!"
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    echo "INFO: Build frontend image"
                    sh "docker build -t frontendimg ."
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
