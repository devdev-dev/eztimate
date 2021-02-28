import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push('/app');
  }
}

Index.getInitialProps = ctx => {
  // We check for ctx.res to make sure we're on the server.
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/app' });
    ctx.res.end();
  }
  return {};
};

export default Index;