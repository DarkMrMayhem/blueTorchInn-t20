## Os dados

Tudo quanto é dado oriundo do livro está na pasta [src/data](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/tree/main/src/data). Se você deseja validar, verificar ou alterar/corrigir algum dado, segue o guia abaixo de como eles estão organizados.

1. [Atributos](#atributos)
2. [Classes](#classes)
3. [Divindades](#divindades)
4. [Equipamentos](#equipamentos)
5. [Nomes](#nomes)
6. [Origens](#origens)
7. [Perícias](#perícias)
8. [Poderes](#poderes)
9. [Raças](#raças)

## Atributos

Os atributos são um tipo de dado simples no arquivo [src/data/atributos.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/data/atributos.ts).

## Classes

Todas as classes estão definidas em [src/data/classes](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/tree/main/src/data/classes). Cada arquivo neste diretório corresponde a uma classe.

Uma vez definida, a classe deve ser exportada em [src/data/classes.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/data/classes.ts). Uma classe exportada irá automaticamente aparecer no filtro e o código já entenderá que pode aleatoriamente selecioná-la.

Uma classe deve respeitar a seguinte interface [src/interfaces/Class.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Class.ts):

```TypeScript
interface ClassDescription {
  name: string;
  subname?: string;
  pv: number;
  addpv: number;
  pm: number;
  addpm: number;
  periciasbasicas: BasicExpertise[];
  periciasrestantes: RemainingExpertise;
  proficiencias: string[];
  abilities: ClassAbility[];
  probDevoto: number;
  qtdPoderesConcedidos?: string;
  faithProbability?: FaithProbability;
  spellPath?: SpellPath;
  setup?: (classe: ClassDescription) => ClassDescription;
}
```

### **name**

Nome da raça (Bárbaro, Guerreiro, etc)

### **subname**

Não é obrigatório. Para casos como o Arcanista (que pode ser Bruxo, Mago ou Feiticeiro).
  
### **pv**

Pontos de vida inicias da classe

### **addpv**

Pontos de vida extra por nível

### **pm**

Pontos de mana iniciais da classe

### **addpm**

Pontos de mana extra por nível

### **periciasbasicas**

[Perícias](#perícias) que a classe ganha com certeza.

A forma de definir esse tipo de situação é utilizar a interface [BasicExpertise](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Class.ts):

```TypeScript
interface BasicExpertise {
  type: string;
  list: Skill[];
}
```

Onde _`type`_ assume os valores `or` ou `and` e _`list`_ a lista de perícias disponíveis.

Exemplos:

- Diplomacia ou Intimidação (escolhido pelo jogador) e também Vontade:

```TypeScript
{
  type: 'or',
  list: [Skill.DIPLOMACIA, Skill.INTIMIDACAO],
}
```

```TypeScript
{
  type: 'and',
  list: [Skill.VONTADE],
}
```

- Diplomacia, Intimidação e Vontade (sem escolha pelo jogador):

```TypeScript
{
  type: 'and',
  list: [Skill.DIPLOMACIA, Skill.INTIMIDACAO, Skill.VONTADE],
}
```

### **periciasrestantes**

Lista de quaisquer outras [perícias](#perícias) que o jogador possa escolher.

Definida pela interface [RemainingExpertise](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Class.ts):

```TypeScript
interface RemainingExpertise {
  qtd: number;
  list: Skill[];
}
```

Onde _`qtd`_ é a quantidade de perícias que podem ser escolhidas e _`list`_ a lista de perícias disponíveis.

### **proficiencias**

Uma lista de strings com o nome das prificiências disponíveis para essa classe.

### **abilities**

A lista de habilidades da classe.

Cada habilidade de classe está definida pela interface [ClassAbility](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Class.ts):

```TypeScript
interface ClassAbility {
  name: string;
  text: string;
  effect?: string | null;
  nivel: number;
}
```

Onde _`name`_ é o nome da habilidade, _`text`_ é a descrição da habilidade, _`effect`_ é o efeito da habilidade e _`nivel`_ é o nível mínimo da habilidade.

### **probDevoto**

Probabilidade dessa classe ser devoto ou não.

### **qtdPoderesConcedidos**

Não é obrigatório. Diz se um devoto deve receber todas as habilidades concedidas pela divindade - neste caso, assumindo o valor `all`.

Se não for definida, é intuído que será escolhido apenas um poder concedido.

### **faithProbability**

Probabilidade de essa classe ser devoto de uma divindade específica. Assume o valor `1` se pode ser devoto dessa divindidade e `0` se não pode.

```TypeScript
faithProbability: {
  AHARADAK: 1,
  OCEANO: 1,
  TENEBRA: 0,
}
```

### **spellPath**

É o caminho de magias que um personagem pode aprender. É definido pela interface  [SpellPath](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Class.ts):

```TypeScript
interface SpellPath {
  initialSpells: number;
  spellType: 'Arcane' | 'Divine';
  schools?: SpellSchool[];
  qtySpellsLearnAtLevel: (level: number) => number;
  spellCircleAvailableAtLevel: (level: number) => number;
  keyAttribute: Atributo;
}
```

onde _`initialSpells`_ é a quantidade de magias inicias, _`spellType`_ é o tipo das magias (só pode assumer os valores `Arcane` e `Divine`), _`schools`_ são as escolas de magias (abjuração, convocação, etc), _`qtySpellsLearnAtLevel`_ é uma função lambda que recebe o _`level`_ do jogador
e retorna quantas magias ele aprenderá naquele nível, e _`keyAttribute`_ é o atributo chave das magias.

As escolas de magias são definidas em [Spells.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Spells.ts).

```TypeScript
type SpellSchool =
  | 'Abjur'
  | 'Adiv'
  | 'Conv'
  | 'Encan'
  | 'Evoc'
  | 'Ilusão'
  | 'Necro'
  | 'Trans';
```

### **setup**

Não é obrigatório. É utilizado quando a classe precisa de algo aleatório. Ela é uma função _lambda_ que recebe a classe e retorna ela modificada (por exemplo, com as magias inicias).

## Divindades

O arquivo [divindades.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/data/divindades.ts) exporta a lista de Divindades definidas na pasta [/divindades](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/tree/main/src/data/divindades).

Cada divindade é definida pela interface [Divindade](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Divindade.ts):

```TypeScript
interface Divindade {
  name: string;
  poderes: GeneralPower[];
}
```

Onde _`name`_ é o nome da divindade e _`poderes`_ é uma lista de [poderes](#poderes) que essa divindade pode dar.

## Equipamentos

Definição dos equipamentos. O arquivo [equipamentos.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/data/equipamentos.ts) exporta os equipamentos. Note que cada equipamento está sendo exportado em uma lista própria: Armas, Armaduras, Escudos, etc.

Cada equipamento é definido pela interface [Equipment](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Equipment.ts):

```TypeScript
interface Equipment {
  nome: string;
  dano?: string;
  critico?: string;
  peso?: number;
  tipo?: string;
  alcance?: string;
  group: equipGroup;
}
```

Onde _`group`_ é o grupo da arma, definido pelo tipo _`equipGroup`_:

```TypeScript
type equipGroup =
  | 'Arma'
  | 'Armadura'
  | 'Escudo'
  | 'Item Geral'
  | 'Alquimía'
  | 'Vestuário'
  | 'Hospedagem'
  | 'Alimentação'
  | 'Animal'
  | 'Veículo'
  | 'Serviço'
  ```

## Nomes

Geração de nomes dependendo da raça. Cada raça recebe duas listas de string: _`Homem`_ para a lista de nomes masculinos e _`Mulher`_ para a lista de nomes femininos.

O nome do objeto deve ser necessariametne o nome da raça (da mesma forma como está escrito no campo _`name`_ das [raças](#raças)).

## Origens

Definição das origens. O arquivo [origins.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/data/origins.ts) define e exporta a lista de origens.

Cada origem é definida pela interface [Origin](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Origin.ts):

```TypeScript
interface Origin {
  name: string;
  pericias: Skill[];
  poderes: (OriginPower | GeneralPower)[];
  getPowersAndSkills?: (usedSkills: Skill[], origin: Origin) => OriginBenefits;
  getItems: () => Items[];
}
```

### **name**

É o nome da origem
### **pericias**

Lista de [perícias](#perícias) adicionais que uma origem oferece.

### **poderes**

Lista de [poderes](#poderes) que a origem oferece.

### **getPowersAndSkills**

É a função que seleciona os poderes e perícias da origem, de acordo com a regra do livro (ou seja, duas opções entre a lista de perícias e poderes combinadas).

Essa função recebe os parâmetros _`usedSkills`_, que é a lista de perícias já selecionadas pelo personagem, e _`origin`_, que é a própria origem em si e retorna um objeto _`OriginBenefits`_, definido como:

```TypeScript
interface OriginBenefits {
  powers: {
    origin: OriginPower[];
    general: PowerGetter[];
  };
  skills: Skill[];
}
```

### **getItems**

É a função que retorna os [itens](#equipamentos) que a origem dá ao personagem.

## Perícias

A lista te perícias está exportada em [Skills.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/interfaces/Skills.ts).

Cada perícia é definida apenas pelo nome.

## Poderes

Definição dos poderes.

## Raças

A lista de raças está exportada no arquivo [racas.ts](https://github.com/YuriAlessandro/gerador-ficha-tormenta20/blob/main/src/data/racas.ts). Cada raça é definida pela interface `Race`:

```TypeScript
interface Race {
  name: string;
  attributes: {
    attrs: RaceAttributeAbility[];
  };
  abilities: RaceAbility[];
  oldRace?: Race;
  setup?: (race: Race, allRaces: Race[]) => Race;
  getSize?: (race: Race) => RaceSize;
  getDisplacement?: (race: Race) => number;
  faithProbability?: FaithProbability;
  size?: RaceSize;
}
```

### **name**

Nome da raça.

### **attributes**

Atributos da raça.

### **abilities**

Lista de habilidades da raça.

### **oldRace**

Uma espécie de raça "anterior". É primordialmente utilizado para o Osteon, então define o que ele era antes de morrer.

### **setup**

Função de setup da raça.

### **getSize**

Função que retorna o tamanho da raça.
### **getDisplacement**

Função que retorna o deslocamento da raça.
### **faithProbability**

Probabilidade de ser devoto de uma divindade específica.

### **size**

Tamanho da raça.

