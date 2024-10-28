class Personagem {
    constructor(nome, vida, ataque) {
        if (this.constructor === Personagem) {
            throw new Error("A classe abstrata Personagem nao pode ser instanciada diretamente.");
        }   
    this.nome = nome;
    this.vida = vida;
    this.ataque = ataque;
    }

atacar(alvo) {
    throw new Error("O método atacar deve ser implementado");
}

atacarAlvoComIntensidade(alvo, intensidade) {
    const danoExtra  = this.ataque * intensidade;
    console.log(`${this.nome} ataca com intensidade ${intensidade} !`);
    alvo.receberDano(danoExtra);
}

receberDano(dano) {
    this.vida -= dano;
    if (this.vida <= 0) {
        this.vida = 0;  
    }
    console.log(`${this.nome} recebeu ${dano} de dano e agora tem ${this.vida} de vida`);
}

estaVivo() {
    return this.vida > 0;
}

getNome() {
    return this.nome;
}

getVida() {
    return this.vida;
}
}

class Guerreiro extends Personagem {
    constructor(nome, vida, ataque) {
    super(nome, vida, ataque);
    }

atacar(alvo) {
    console.log(`${this.nome} atacou ${alvo.getNome()} e causou ${this.ataque} de dano`);
    alvo.receberDano(this.ataque);
}
atacarComFuria(alvo) {
    console.log(`${this.nome} usa ataque com fúria!`);
    alvo.receberDano(this.ataque * 2);
}
}

class Mago extends Personagem {
    constructor(nome, vida, ataque, mana) {
    super(nome, vida, ataque);
    this.mana = mana;
    }

    atacar(alvo) {
        if (this.mana > 0) {
            console.log(`${this.nome} atacou ${alvo.getNome()} e causou ${this.ataque} de dano`);
            alvo.receberDano(this.ataque);
            this.mana -= 16;
        } else {
            console.log(`${this.nome} não tem mana suficiente para atacar`);
            alvo.receberDano(this.ataque / 2);
        }
    }
    atacarComManaExtra(alvo, manaExtra) {
        if (this.mana >= manaExtra) {
            console.log(`${this.nome} lança um feitiço poderoso com ${manaExtra} de mana extra`);
            alvo.receberDano(this.ataque += manaExtra);
            this.mana -= manaExtra;
        }
        else {
            console.log(`${this.nome} não tem mana suficiente para esse ataque!`);
            this.atacar(alvo);
        }
    }
    getMana() {
        return this.mana;
    }
}

module.exports = {
    Personagem,
    Guerreiro,
    Mago
  };

