pipeline {
    agent {
        docker {
            image 'node:18' // Usa una versión que incluya npx
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/oelorduy/vettapp-jenkins.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Compilando el proyecto...'
                sh 'echo "Simulación de la compilación exitosa"'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias...'
                sh 'npm ci' // O 'npm install' si no tienes package-lock.json
            }
        }

        stage('Test') {
            steps {
                echo 'Ejecutando Pruebas automatizadas...'
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