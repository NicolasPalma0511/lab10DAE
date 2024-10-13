job "nodejs-app" {
  datacenters = ["dc1"]
  type        = "service"

  group "nodejs-group" {
    count = 1

    network {
      port "http" {
        static = 3000
      }
    }

    task "nodejs-task" {
      driver = "docker"

      config {
        image = "nicolaspalma/lab10"

        ports = ["http"]

        env {
          MSSQL_USER     = "SA"
          MSSQL_PASSWORD = "YourStrong@Passw0rd"
          MSSQL_SERVER   = "ec2-44-211-193-26.compute-1.amazonaws.com"
          MSSQL_PORT     = "1433"
          MSSQL_DATABASE = "lab10"
        }
      }

      resources {
        cpu    = 500
        memory = 256
      }
    }
  }
}
