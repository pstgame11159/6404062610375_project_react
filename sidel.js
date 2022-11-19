x = [10,15,20,30,40,50,60,70,80]
y = [5,9,15,18,22,30,35,38,43]
m = 2
a = [[]]
b = []
n = 9
ans = []

for(i=0;i<m+1;i++){
    b[i] = 0
    a[i] = []
    for(j=0;j<m+1;j++){
        a[i][j] = 0
    }
}

for(ir=0;ir<=m;ir++){
    for(ic=0;ic<=m;ic++){
        k = (ir+1) + (ic+1)-2
        for(i=0;i<n;i++){
            a[ir][ic] = a[ir][ic] + x[i]**k
        }
    }
    for(i=0;i<n;i++){
        b[ir] = b[ir] + y[i]*(x[i]**(ir))
    }
}

//gauss cal
c = a
for(i=0;i<c.length;i++){
    c[i][a.length] = b[i]
}

for(k=0;k<c.length;k++){
    for(i=k+1;i<c.length;i++){
        temp = c[i][k]/a[k][k]
        for(j=k+1;j<=c.length;j++){
            c[i][j] = c[i][j] - temp*c[k][j]
        }
    }
}

for(i=c.length-1;i>=0;i--){
    ans[i] = c[i][c.length]
    for(j=i+1;j<c.length;j++){
        ans[i] = ans[i]-a[i][j]*ans[j]
    }
    ans[i] = ans[i]/a[i][i]
}

console.log("a0 = "+ans[0])
console.log("a1 = "+ans[1])
console.log("a2 = "+ans[2])
console.log("f(x) = "+ans[0]+" + "+ans[1]+"(x1) "+ans[2]+"(x^2)")