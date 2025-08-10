import type React from 'react';

const EnvPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold">Environment</h2>
      <p>
        NODE_ENV: <code>{process.env.NODE_ENV}</code>
      </p>
      <p>
        VERCEL_ENV: <code>{process.env.VERCEL_ENV}</code>
      </p>
      <p>
        DOTENVX_ENV: <code>{process.env.DOTENVX_ENV}</code>
      </p>
      <p>
        SAMPLE_SECRET: <code>{process.env.SAMPLE_SECRET}</code>
      </p>
    </div>
  );
};

export default EnvPage;
