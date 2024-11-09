pipeline {
    agent { dockerContainer { image 'ecotracer/front' } }
    environment {
        REPO_URL = "https://github.com/Fredericsonn/sirius-front.git"
        REMOTE_USER = "eco"
        REMOTE_HOST = "172.31.253.53"
        REMOTE_PATH = "/home/eco/app"
    }
    stages {
        stage('Cloning the repository') {
            steps {
                git branch : "master", url: "${env.REPO_URL}"
            }
        }
        stage("Build") {
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
            steps {
                archiveArtifacts artifacts : "dist/*", allowEmptyArchive: false
            }
        }
        stage("Deploy to the front server") {
            steps {
                sshagent(['frontend']) { 
                    sh """
                        ssh -o StrictHostKeyChecking=no "${env.REMOTE_USER}"@"${env.REMOTE_HOST}" "if lsof -ti:3000 > /dev/null; then kill -9 \$(lsof -ti:3000); fi; rm -rf ${env.REMOTE_PATH}/*"
                        scp -o StrictHostKeyChecking=no -r dist/ "${env.REMOTE_USER}"@"${env.REMOTE_HOST}":"${env.REMOTE_PATH}"
                        ssh -o StrictHostKeyChecking=no "${env.REMOTE_USER}"@"${env.REMOTE_HOST}" 'cd ${env.REMOTE_PATH} && screen -d -m serve -s dist/'
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
