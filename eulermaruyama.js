function eulermaruyama(dt, n, X0, rnvec, a, b, rho = 0) {
    const p = X0.length;

    let X = Array(n + 1).fill(0).map(i => Array(p).fill(0));
    X[0] = X0;

    let w = 0;

    let Z0, Z1;
    for (let i = 1; i < n + 1; ++i) {
        let aX, bX;
        aX = a(X[i - 1]);
        bX = b(X[i - 1]);

        if (p == 1) {
            Z0 = rnvec[w]; ++w;
            X[i][0] = X[i - 1][0] + (aX[0] * dt) + (bX[0] * Math.sqrt(dt) * Z0);
        } else if (p == 2) {
            Z0 = rnvec[w]; ++w;
            Z1 = rnvec[w]; ++w;
            X[i][0] = X[i - 1][0] + (aX[0] * dt) + bX[0] * Math.sqrt(dt) * (Z0);
            X[i][1] = X[i - 1][1] + (aX[1] * dt) + bX[1] * Math.sqrt(dt) * (rho * Z0 + Math.sqrt(1 - rho * rho) * Z1);
        }
    }
        
    return X;
}