# dotenvx nextjs demo

This is a prototype for using dotenvx and nextjs.  The learnings were [documented here](https://github.com/dotenvx/dotenvx/issues/616#issuecomment-3172568761), reproduced below:

Hey @ChristoRibeiro: I had this issue and investigated.  I was getting the same error and doing the below solved it for me.

I have a small trial nextjs / vercel package here to demonstrate it: https://github.com/tianhuil/dotenvx-proto

The behavior is pretty complex and here is the summary:

|                                        	| Path              	| [Production](https://dotenvx-proto.vercel.app/) 	| [Preview with delete](https://dotenvx-proto-git-delete-tianhuils-projects.vercel.app/) 	| [Preview without delete](https://dotenvx-proto-git-no-delete-tianhuils-projects.vercel.app/) 	|
|----------------------------------------	|-------------------	|-------------------------------------------------	|----------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------------------	|
| page.tsx                               	| `/env`            	| ✅                                               	| ✅                                                                                      	| ✅                                                                                            	|
| static `route.ts`                      	| `/static`         	| ✅                                               	| ✅                                                                                      	| ✅                                                                                            	|
| dynamic `route.ts`                     	| `/dynamic`         	| ❌                                               	| ❌                                                                                      	| ❌                                                                                            	|
| dynamic `routes.ts` using `dotenv.get` 	| `/dynamic-dotenvx` 	| ✅                                               	| ✅                                                                                      	| ❌                                                                                            	|
| dynamic `routes.ts` with config        	| `/dynamic-config`  	| ✅                                               	| ✅                                                                                      	| ❌                                                                                            	|

In the above table, I have a production branch, and 2 preview branches.  In one of the preview branches, I delete the `.env.production` at build time but not in the other one.

In dynamic (but not static) `route.ts`, the `.env.production` file is loaded.  It is always loaded encrypted (in main and preview without delete) but not loaded if `.env.production` has been deleted.  This loading circumvents the `dotenvx` decryption process.  We can see this in the build output:

<img width="676" height="98" alt="Image" src="https://github.com/user-attachments/assets/dffa6872-04df-4ce9-a26d-d4d952bf8e98" />

Futhermore, it doesn't matter if I use `dotenvx.config` with the `.env.preview` path and load the variable with `dotenvx.get('SAMPLE_SECRET')`, the environment uses the `.env.production` secrets instead.
<img width="715" height="369" alt="Image" src="https://github.com/user-attachments/assets/26d7a321-2581-4a51-9371-d31564e63b5e" />

Also, note that if you want to setup a separate preview environment for preview branches (@maxbec, I think this is what was your error), you need to use
```bash
dotenvx run -f .env.${VERCEL_ENV} --overload -- 
```

Here is my script for deleting the other .env files at build time (https://github.com/tianhuil/dotenvx-proto/blob/no-delete/script/delete-env.ts).

And yes, the private secrets are injected into Vercel.

<img width="937" height="250" alt="Image" src="https://github.com/user-attachments/assets/d1a623e2-2822-4687-ad3c-2c0212d0c879" />

## TL;DR
To get a preview branch working you need to use all 3 of these:
1. Delete `.env.production` (not an issue in the production branch)
2. Run the command inside `dotenvx run -f .env.${VERCEL_ENV} --overload -- [cmd]`
3. use `dotenvx.get('SECRET')` instead of `process.env.SECRET`

Some instances don't require all of these but it is easiest just to do all of them.  You might be able to [use this](https://nextjs.org/docs/messages/env-loading-disabled) in lieu of Step 1 but I think it's a little too black magic for me.

---

This is based on a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

