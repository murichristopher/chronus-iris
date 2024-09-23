RUNNING_RABBIT := $(shell docker ps -a --filter "name=my_rabbit" --format "{{.Names}}")
RUNNING_REDIS := $(shell docker ps -a --filter "name=my_redis" --format "{{.Names}}")
RUNNING_DB := $(shell docker ps -a --filter "name=my_postgres" --format "{{.Names}}")

start:
	bun index.ts

redis:
ifeq ($(RUNNING_REDIS), my_redis)
	docker start my_redis
else
	docker run --name my_redis -d -p 6379:6379 redis redis-server --bind 0.0.0.0 --requirepass yourpassword --protected-mode no
endif

rabbit:
ifeq ($(RUNNING_RABBIT), my_rabbit)
	docker start my_rabbit
else
	docker run --name my_rabbit -p 5672:5672 -p 15672:15672 -d rabbitmq:3.13-management
endif

db:
ifeq ($(RUNNING_DB), my_postgres)
	docker start my_postgres
else
	docker run --name my_postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres:16.2-alpine
endif

redis_cli:
	redis-cli -h localhost -p 6379 -a yourpassword


