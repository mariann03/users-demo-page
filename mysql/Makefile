docker-build:
	@docker build -t usersdb/mysql .

docker-start:
	@docker stack deploy -c ./stack.yml usersdb

docker-update:
	@make docker-build
	@docker service update --force -d usersdb_db

docker-stop:
	@docker stack rm usersdb