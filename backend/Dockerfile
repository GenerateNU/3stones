FROM golang:1.23-alpine as builder

WORKDIR /app
RUN apk add --no-cache git

COPY . ./
RUN go build -o bin/3stones cmd/server/main.go

FROM scratch
COPY --from=builder /app/bin/3stones /3stones
ENV APP_ENVIRONMENT production

ENTRYPOINT [ "./3stones" ]
