run: docker-pull docker-build deps docker-up-d

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

docker-up-d:
	docker-compose up -d

deps:
	docker-compose run dev-server npm install -y
