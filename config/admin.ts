export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6c402aecebb17f0d629f054d7babf32a'),
  },
});
