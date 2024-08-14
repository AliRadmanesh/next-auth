## Prisma ORM Cheatsheet

### Seeding the Database

1. Create a `seed.ts` (or `seed.mjs` if you want to import ES modules) and write a function to create a table based on your schema by using prisma client.

2. Add below code to your `package.json` config:

```
"prisma": {
    "seed": "ts-node prisma/seed.mjs"
}
```

3. Run `npx prisma db seed`
