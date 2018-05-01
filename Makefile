ci:
	VERSION=${VERSION} make docker-build \
		tag \
		push

docker-build:
	docker build -t split-test .

tag:
	docker tag split-test patrickleet/split-test:${VERSION}

push:
	docker push patrickleet/split-test:${VERSION}