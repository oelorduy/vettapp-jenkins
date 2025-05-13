pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url:'https://github.com/oelorduy/vettapp-jenkins.git', branch: 'main'  
            }
        }
    
        stage('Build') {
            steps {
               
                echo 'Compilando el proyecto...'
                sh 'echo "Simulación de la compilación exitosa"'
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
