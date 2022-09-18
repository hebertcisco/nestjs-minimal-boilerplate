# Basic documentation

## Runing the application with docker

### Run as dev

```sh
docker-compose up dev
```

### Run as prod

```sh
docker-compose up -d prod
```

## Runing the application with npm scrips

```sh
npm install && npm run build
```

```sh
npm run prepare:enviroment
```

### Run as dev

```sh
npm run dev
```

or

```sh
npm run dev:test
```

### Run as prod

```sh
npm run start
```

or

```sh
npm run start:prod
```
