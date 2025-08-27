export type Platform = {
  Zenn?: string | null;
  Qiita?: string | null;
  url: string;
};

export const PLATFORM: Platform[] = [
  {
    Zenn: "Dockerイメージ軽量化のアーキテクチャ設計を考える",
    url: "https://zenn.dev/fuuji/articles/9eb7f2aefcd6c5",
  },
  {
    Zenn: "Dockerイメージの安全性を高める10のセキュリティハック",
    url: "https://zenn.dev/fuuji/articles/3909c8d444eaa9",
  },
  {
    Zenn: "Terraform で DockerイメージをLambdaへデプロイ",
    url: "https://zenn.dev/fuuji/articles/547388be4ca9ce",
  },
  {
    Zenn: "Terraform で ECR + Lambda + API Gateway 構築し、FastAPI をサーバーレスにデプロイ",
    url: "https://zenn.dev/fuuji/articles/f712b546218815",
  },
  {
    Zenn: "Fiber + Redis で URL Shortenerを実装し、仕組みを理解する",
    url: "https://zenn.dev/fuuji/articles/5e148160d40698",
  },
  {
    Zenn: "TerraformでAmplifyを構築し、爆速でデプロイする",
    url: "https://zenn.dev/fuuji/articles/795a7b6c9e4050",
  },
  {
    Qiita: "ソケット通信を一緒に理解しよう！！",
    url: "https://qiita.com/fujifuji1414/items/6daa393a86582d81f0b5",
  },
  {
    Qiita: "ブラウザでWebサイトが表示されるまでの仕組みを整理してみた",
    url: "https://qiita.com/fujifuji1414/items/f9c53b451fa4890b8bfc",
  },
  {
    Qiita: "OSの仕組みと魅力について知る",
    url: "https://qiita.com/fujifuji1414/items/5373f3da51465c82d0d4",
  },
  {
    Qiita: "【Go言語】阿部寛さんのHPをechoでホスティングしてみる",
    url: "https://qiita.com/fujifuji1414/items/612d3fdc2bafdfb7b524",
  },
  {
    Qiita: "【Go言語】Goで学ぶOAuth認証",
    url: "https://qiita.com/fujifuji1414/items/98af4c0529430f112209",
  },
  {
    Qiita: "【Go言語】Qiitaの投稿をGitHubのプロフィールに反映させてみた",
    url: "https://qiita.com/fujifuji1414/items/f9606bb184951d4a3fb2",
  },
];
