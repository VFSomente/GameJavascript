const { Guerreiro, Mago } = require('./personagem.js');

const guerreiro = new Guerreiro("Biel", 120, 20);
const mago = new Mago("Selênio", 120, 50, 20);

while (guerreiro.estaVivo() && mago.estaVivo()) {
    if (Math.random() < 0.05) {
        console.log(`${guerreiro.getNome()} tentou atacar, mas falhou e errou o ataque!`);
    } else { 
        if (Math.random() < 0.2) {
            guerreiro.atacarComFuria(mago);
        } else {
            guerreiro.atacar(mago);
        }
    
        if (!mago.estaVivo()) {
            console.log(`${mago.getNome()} foi derrotado!`);
            break;
        }
    }

    
    if (Math.random() < 0.05) {
        console.log(`${mago.getNome()} tentou atacar, mas falhou e errou o ataque!`);
    } else {
        if (Math.random() < 0.2) {
            mago.atacarComManaExtra(guerreiro, 20);
        } else {
            mago.atacar(guerreiro);
    }
    if (!guerreiro.estaVivo()) {
        console.log(`${guerreiro.getNome()} foi derrotado!`);
        break;
    }
}

    console.log();
}
