## JSInspector

Make jsinspect results easier to analyze by comparing them side-by-side.

### Usage

1. Place JSON output of `jsinspect --reporter=json` into `./server/data/report.json`  
   You can also rename the sample report (subset of a mathjs analysis): `mv ./server/data/report.sample.json ./server/data/report.json`
2. Run `npm install`. This will install client and server packages.
3. Run `npm run dev`, if you want to start in development mode.
4. Run `npm run build` and `npm start`, if you want to start in production mode.
