pipeline {
    agent none  
    environment {
        REPO_URL = "https://github.com/Fredericsonn/sirius-front.git"
        REMOTE_USER = "eco"
    }
    stages {
        stage('Cloning the repository') {
            agent { 
                docker { 
                    image 'ecotracer/front-agent' 
                } 
            }
            steps {
                git branch: "master", url: "${env.REPO_URL}"
            }
        }
        stage("Build") {
            agent { 
                docker { 
                    image 'ecotracer/front-agent' 
                } 
            }
            steps {
                script {    
                    sh '''
                        npm install
                        npm run build 
                    '''
                }
            }
        }
        stage("Archive artifact") {
            agent { 
                docker { 
                    image 'ecotracer/front-agent' 
                } 
            }   
            steps {
                archiveArtifacts artifacts: "dist/,Dockerfile", allowEmptyArchive: false
            }
        }
        stage("Building Docker Image") {
            agent { 
                docker { 
                    image 'ecotracer/dind' 
                    args '--user root --restart always -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                } 
            }
            steps {
                script {
                    sh 'docker build -t ${IMAGE_NAME} .'
                }
            }
        }

        stage("Pushing Image to DockerHub") {
            agent { 
                docker { 
                    image 'ecotracer/dind' 
                    args '--user root --restart always -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""' 
                } 
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        docker login -u $USERNAME -p $PASSWORD
                        docker push ${IMAGE_NAME}
                    '''
                }
            }
        }
        stage("Deploy to the front server") {
            agent { 
                docker { 
                    image 'ecotracer/dind' 
                    args '--user root --restart always -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                } 
            }
            steps {
                sshagent(['frontend']) { 
                    sh """
                        ssh -o StrictHostKeyChecking=no "${env.REMOTE_USER}"@"${env.REMOTE_HOST}" "lsof -ti:3000 | xargs -r kill -9; docker rm -f frontend"
                        ssh -o StrictHostKeyChecking=no "${env.REMOTE_USER}"@"${env.REMOTE_HOST}" "docker rmi -f ${IMAGE_NAME} && docker run -d --name frontend -p 3000:3000 -e API=${API} ${IMAGE_NAME}"
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}
