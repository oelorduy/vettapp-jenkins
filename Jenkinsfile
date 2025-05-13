pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url:'https://github.com/oelorduy/vettapp-jenkins.git', branch: 'main'  
            }
        }
    
       stage('Instalar dependencias') {
            steps {
                echo 'Instalando dependencias del proyecto...'
                sh 'npm install'
                sh 'npm install --save-dev jest-environment-jsdom'
            }
        }

        stage('Test') {
            steps {

                echo 'Ejecutando Pruebas automatizadas..'
                sh 'npx jest test/Formulario.test.jsx'

            }
        }

        stage('Deploy Simulation') {
            steps {
                echo 'Simulación de Despliegue'
                sh 'echo "Simulación de despliegue Exitoso"'

            }
        }
    }
    
}
