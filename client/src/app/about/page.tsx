"use client";

import Header from "@/components/Header";

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Cookie Pokie 소개
                    </h1>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg mb-6">
                            Cookie Pokie는 영화의 쿠키 장면(엔딩 크레딧 중간이나
                            후반에 나오는 추가 장면)에 대한 정보를 제공하는
                            서비스입니다.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">
                            서비스 목적
                        </h2>
                        <p>
                            많은 영화 팬들이 영화가 끝난 후에도 자리를 떠나지
                            않고 쿠키 영상을 기다리는 경우가 많습니다. 하지만
                            모든 영화에 쿠키 영상이 있는 것은 아니기 때문에,
                            불필요한 시간을 낭비하게 되는 경우도 있습니다.
                            Cookie Pokie는 이러한 문제를 해결하기 위해 영화의
                            쿠키 장면 유무와 개수에 대한 정보를 제공합니다.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">
                            주요 기능
                        </h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li className="mb-2">
                                영화별 쿠키 장면 유무 및 개수 확인
                            </li>
                            <li className="mb-2">영화 제목으로 검색</li>
                            <li className="mb-2">쿠키 유무에 따른 필터링</li>
                            <li className="mb-2">최신 영화 정보 업데이트</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">
                            기술 스택
                        </h2>
                        <p>
                            Cookie Pokie는 다음과 같은 기술 스택으로
                            구현되었습니다:
                        </p>
                        <ul className="list-disc pl-6 mb-6">
                            <li className="mb-2">
                                프론트엔드: Next.js, React, TypeScript, Tailwind
                                CSS
                            </li>
                            <li className="mb-2">
                                상태 관리: Zustand, React Query
                            </li>
                            <li className="mb-2">백엔드: NestJS, TypeScript</li>
                            <li className="mb-2">
                                데이터베이스: PostgreSQL, Drizzle ORM
                            </li>
                            <li className="mb-2">유효성 검사: Zod</li>
                            <li className="mb-2">배포: Docker</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">
                            연락처
                        </h2>
                        <p>
                            서비스에 대한 문의나 피드백이 있으시면 아래 이메일로
                            연락해주세요:
                        </p>
                        <p className="font-semibold">contact@cookiepokie.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
