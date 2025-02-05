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
                    args '--user root' 
                } 
            }
            steps {
                git branch: "${BRANCH}", url: "${env.REPO_URL}"
            }
        }
        
        stage("Build") {
            agent { 
                docker { 
                    image 'ecotracer/front-agent' 
                    args '--user root' 
                } 
            }
            steps {
                script {    
                    sh '''
                        echo "VITE_API=${API}" > .env
                        rm -rf node_modules package-lock.json
                        npm cache clean --force
                        npm install --no-optional 
                        npm install rollup --save-dev
                        npm run build 
                    '''
                }
            }
        }
        
        stage("Archive artifact") {
            agent { 
                docker { 
                    image 'ecotracer/front-agent' 
                    args '--user root' 
                } 
            }   
            steps {
                archiveArtifacts artifacts: "dist,Dockerfile", allowEmptyArchive: false
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
                    sh 'docker build -t ${REGISTRY_URL}/${IMAGE_NAME} .'
                }
            }
        }

        stage("Pushing Image to the registry") {
            agent { 
                docker { 
                    image 'ecotracer/dind' 
                    args '--user root --restart always -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""' 
                } 
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'registry', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        docker login ${REGISTRY_URL} -u $USERNAME -p $PASSWORD
                        docker push ${REGISTRY_URL}/${IMAGE_NAME}
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
                sshagent(['creds']) { 
                    sh """
                        ssh -o StrictHostKeyChecking=no "${env.REMOTE_USER}"@"${env.REMOTE_HOST}" "docker stop frontend || true && docker rm frontend || true"
                        ssh -o StrictHostKeyChecking=no "${env.REMOTE_USER}"@"${env.REMOTE_HOST}" "docker rmi -f ${REGISTRY_URL}/${IMAGE_NAME} && docker run -d --name frontend --network host -e API=${API} ${REGISTRY_URL}/${IMAGE_NAME}"
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
