const guerreiro = new Guerreiro("Biel", 120, 20);
const mago = new Mago("Selêncio", 120, 40, 60);
const resultDiv = document.getElementById("result");

// Adicione os caminhos das imagens
const guerreiroIcone = 'img/guerreiro.png'; // Caminho para a imagem do guerreiro
const magoIcone = 'img/mago.png'; // Caminho para a imagem do mago
const vidaIcone = 'img/vida.png'; // Caminho para a imagem da barra de vida

function mostrarResultado(mensagem, icone) {
    return new Promise((resolve) => {
        const p = document.createElement("p");

        // Adiciona o ícone do personagem
        const img = document.createElement("img");
        img.src = icone; // Define a fonte da imagem
        img.alt = "Ícone do Personagem";
        img.style.width = "30px"; // Ajuste o tamanho conforme necessário
        img.style.marginRight = "10px"; // Espaçamento entre a imagem e o texto

        p.appendChild(img); // Adiciona o ícone ao parágrafo
        p.innerHTML += mensagem; // Adiciona a mensagem de texto
        p.classList.add("resultado"); // Adiciona a classe para o efeito CSS
        resultDiv.appendChild(p);

        // Resolve a promessa após um certo tempo
        setTimeout(() => {
            resolve(); // Resolve a promessa após 2 segundos
        }, 2000); // Exibe a mensagem por 2 segundos
    });
}

async function iniciarBatalha() {
    resultDiv.innerHTML = ""; // Limpa o resultado anterior
    while (guerreiro.estaVivo() && mago.estaVivo()) {
        // Ação do Guerreiro
        if (Math.random() < 0.05) {
            await mostrarResultado(`${guerreiro.getNome()} tentou atacar, mas falhou e errou o ataque!`, guerreiroIcone);
        } else {
            if (Math.random() < 0.2) {
                guerreiro.atacarComFuria(mago);
                await mostrarResultado(`${guerreiro.getNome()} usou ataque com fúria!`, guerreiroIcone);
                if (!mago.estaVivo()) {
                    await mostrarResultado(`${mago.getNome()} foi derrotado!`, magoIcone);
                    break;
                }
            } else {
                guerreiro.atacar(mago);
                await mostrarResultado(`${guerreiro.getNome()} atacou ${mago.getNome()} e causou ${guerreiro.ataque} de dano!`, guerreiroIcone);
                if (!mago.estaVivo()) {
                    await mostrarResultado(`${mago.getNome()} foi derrotado!`, magoIcone);
                    break;
                }
            }
        }

        // Ação do Mago
        if (Math.random() < 0.05) {
            await mostrarResultado(`${mago.getNome()} tentou atacar, mas falhou e errou o ataque!`, magoIcone);
        } else {
            if (Math.random() < 0.3) {
                mago.atacarComManaExtra(guerreiro, 20);
                await mostrarResultado(`${mago.getNome()} lançou um feitiço poderoso!`, magoIcone);
            } else {
                mago.atacar(guerreiro);
                await mostrarResultado(`${mago.getNome()} atacou ${guerreiro.getNome()} e causou ${mago.ataque} de dano!`, magoIcone);
            }
            if (!guerreiro.estaVivo()) {
                await mostrarResultado(`${guerreiro.getNome()} foi derrotado!`, guerreiroIcone);
                break;
            }
        }

        // Exibe a vida atual dos personagens
        await mostrarResultado(`Vida: ${guerreiro.getNome()} (${guerreiro.getVida()}) | ${mago.getNome()} (${mago.getVida()})`, vidaIcone);

    }

    // Mostra o botão de reiniciar ao final da batalha
    document.getElementById("resetButton").style.display = "block";
}

document.getElementById("startButton").addEventListener("click", iniciarBatalha);
document.getElementById("resetButton").addEventListener("click", () => {
    location.reload(); // Recarrega a página para reiniciar a batalha
});
