## Starting the project 

* Install the required dependencies

```bash
bun install
```

* Initialize Redis

```bash
make redis
```

* Initialize RabbitMQ

```bash
make rabbit
```

* Initialize Docker

```bash
docker compose up -d
```

* Start the server

```bash
make start
```

## Notebook

```bash
./rabbitmqadmin publish exchange=amq.default routing_key=hello payload='{"text":"Olá, esta é uma mensagem para o RabbitMQ!"}'
```
