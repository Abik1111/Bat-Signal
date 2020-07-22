function dft(values){
    const X=[];
    const N=values.length;
    let freq=0,amp=0,phase=0;
    for(let k=0;k<N;k++){
        let re=0;
        let im=0;
        for(let n=0;n<N;n++){
            const phi=(2*PI*k*n)/N;
            re+= values[n]*cos(phi);
            im-= values[n]*sin(phi);
        }
        re=re/N;
        im=im/N;
        amp=sqrt(re*re+im*im);
        freq=k;
        phase=atan2(im,re);
        X[k]={re,im,freq,amp,phase};

    }


    return X;
}