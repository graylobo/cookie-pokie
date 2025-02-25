# Cookie Pokie - 영화 쿠키 정보 사이트

영화의 쿠키 장면(엔딩 크레딧 중간이나 후반에 나오는 추가 장면) 유무와 개수를 확인할 수 있는 웹 서비스입니다.

## 기술 스택

### 백엔드

-   NestJS
-   TypeScript
-   PostgreSQL
-   Drizzle ORM
-   Zod

### 프론트엔드

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   Zustand
-   React Query

### 배포

-   Docker
-   Docker Compose
-   AWS (EC2, RDS, S3, CloudFront)

## 프로젝트 구조

```
cookie-pokie/
├── client/             # 프론트엔드 (Next.js)
├── server/             # 백엔드 (NestJS)
├── shared/             # 공유 타입 정의
├── docker-compose.yml  # Docker Compose 설정
├── docker-compose.prod.yml  # 프로덕션용 Docker Compose 설정
└── .env                # 환경 변수
```

## 시작하기

### 개발 환경 설정

1. 저장소 클론

```bash
git clone https://github.com/yourusername/cookie-pokie.git
cd cookie-pokie
```

2. 환경 변수 설정

```bash
cp .env.example .env
```

3. Docker Compose로 개발 환경 실행 (권장)

```bash
docker-compose up -d
```

4. 서비스 접속
    - 프론트엔드: http://localhost:3000
    - 백엔드 API: http://localhost:4000/api

### 개별 서비스 개발 (Docker 없이)

1. 백엔드 개발 서버 실행

```bash
cd server
pnpm install
pnpm run start:dev
```

2. 프론트엔드 개발 서버 실행

```bash
cd client
pnpm install
pnpm run dev
```

## AWS 배포 가이드

### 사전 준비

1. AWS 계정 생성 및 설정
2. AWS CLI 설치 및 구성
3. 프로덕션용 환경 변수 설정

### 배포 아키텍처

```
                   +----------------+
                   |   CloudFront   |
                   +--------+-------+
                            |
                   +--------v-------+
                   |       S3       |
                   | (Next.js 정적) |
                   +----------------+
                            |
+----------------+  +--------v-------+  +----------------+
|      RDS       |  |      EC2       |  |  ElastiCache   |
| (PostgreSQL)   |<-|   (NestJS)     |->| (선택사항)     |
+----------------+  +----------------+  +----------------+
```

### 배포 단계

1. **데이터베이스 설정 (RDS)**

```bash
# AWS CLI로 PostgreSQL RDS 인스턴스 생성
aws rds create-db-instance \
    --db-instance-identifier cookie-pokie-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --allocated-storage 20 \
    --master-username dbadmin \
    --master-user-password <your-password> \
    --vpc-security-group-ids <security-group-id> \
    --db-subnet-group-name <subnet-group-name>
```

2. **백엔드 배포 (EC2)**

```bash
# EC2 인스턴스에 Docker 설치
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo chkconfig docker on

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 프로젝트 클론 및 설정
git clone https://github.com/yourusername/cookie-pokie.git
cd cookie-pokie
cp .env.example .env.prod

# 환경 변수 편집
nano .env.prod

# 프로덕션 환경으로 실행
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

3. **프론트엔드 배포 (S3 + CloudFront)**

```bash
# 프론트엔드 빌드
cd client
pnpm install
pnpm run build

# S3 버킷 생성 및 정적 파일 업로드
aws s3 mb s3://cookie-pokie-frontend
aws s3 sync out/ s3://cookie-pokie-frontend --delete

# CloudFront 배포 생성
aws cloudfront create-distribution \
    --origin-domain-name cookie-pokie-frontend.s3.amazonaws.com \
    --default-root-object index.html
```

4. **HTTPS 설정**

```bash
# ACM에서 인증서 발급
aws acm request-certificate \
    --domain-name cookiepokie.com \
    --validation-method DNS \
    --subject-alternative-names www.cookiepokie.com

# CloudFront 배포에 인증서 연결
aws cloudfront update-distribution \
    --id <distribution-id> \
    --ssl-certificate <certificate-arn>
```

5. **CI/CD 파이프라인 설정 (선택사항)**

GitHub Actions 또는 AWS CodePipeline을 사용하여 자동 배포 파이프라인을 구성할 수 있습니다.

## 기능

-   영화별 쿠키 장면 유무 및 개수 확인
-   영화 제목으로 검색
-   쿠키 유무에 따른 필터링
-   최신 영화 정보 업데이트

## 개발자

-   이름: [개발자 이름]
-   이메일: contact@cookiepokie.com

## 라이센스

MIT
