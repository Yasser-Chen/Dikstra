
<h1>
    Section 1 : Entrez les détails de votre carte
</h1>

<br />
<h3>
    Étape 1 : Entrez le nom du point
</h3>

<br />
Dans cette étape, vous devez entrer le nom de chaque point de votre carte. Le nom du point doit être unique.

<br />
<b>Conditions</b>
<br />

<ul><li>
    Veuillez créer plus d'un seul sommet !
</li></ul>
<br />
Vous devez créer au moins deux sommets pour créer une carte valide.
<br />
<br />

<br />
<h3>
    Étape 2 : Entrez le point de départ, le point d'arrivée et la distance
</h3>

<br />
Dans cette étape, vous devez entrer le point de départ, le point d'arrivée et la distance entre les deux points. Le point de départ doit être différent du point d'arrivée.

<br />
<b>
    Conditions
</b>

<br />
<ul><li>
    Veuillez ne pas répéter la même association !
</li></ul>
<br />
Vous ne pouvez pas créer deux associations identiques. Par exemple, vous ne pouvez pas créer une association entre le point A et le point B, puis une autre association entre le point B et le point A.
<br />
<ul><li>
    Veuillez ne pas connecter un point avec lui même !
</li></ul>
<br />
Vous ne pouvez pas créer une association entre un point et lui-même.

<br />

<ul><li>
    Veuillez ne pas laisser un sommet isolé !
</li></ul>

<br />

Chaque sommet doit être connecté à au moins un autre sommet.

<br />
<b>
    Exemple :
</b>

<br />

Voici un exemple d'une carte valide :


<table class="table table-bordered table-sm" >
    <tr>
        <th>Point de départ </th>
        <th>Point d'arrivée </th>
        <th>Distance        </th>
    </tr>
    <tr>
        <td>A </td>
        <td>B </td>
        <td>12</td>
    </tr>
    <tr>
        <td>B </td>
        <td>C </td>
        <td>8 </td>
    </tr>
</table>
<br />
Dans cet exemple, la carte comporte trois sommets : A, B et C. Le point de départ est A, le point d'arrivée est B et la distance entre les deux points est de 10. Le point de départ est ensuite B, le point d'arrivée est C et la distance entre les deux points est de 20.

<br />
<br />

<b>Remarques :</b>
<ul>
    <li>Vous pouvez entrer les informations dans n'importe quel ordre.</li>
    <li>Les distances doivent être des nombres entiers.</li>
</ul>
<br />
<br />
<br />
<br />


<h1>
    Section 2 : Utilisation de la carte
</h1>

Pour utiliser la carte, double-cliquez sur un cercle pour le sélectionner. Le cercle sélectionné sera entouré d'une bordure jaune. Une fois que vous avez sélectionné deux points, l'algorithme de recherche de chemin de Kruskal commence à fonctionner. Le chemin le plus court entre les deux points sera mis en évidence en surbrillance. Vous pouvez répéter ce processus autant de fois que vous le souhaitez. Vous pouvez annuler la sélection en cliquant sur un autre élément de la carte. Les associations afficheront des flèches pour indiquer le sens du trajet, car A -> B n'est pas égal à B -> A.
<br />
<br />
<br />
<br />

<h1>
    Section 3 : Algorithme utilisé
</h1>

<br>

<p>
    L'algorithme de Kruskal est un algorithme de recherche d'arbre couvrant de poids minimum (ARPM). Un arbre couvrant de poids minimum est un arbre qui relie tous les sommets d'un graphe avec le moins de poids possible. L'algorithme de Kruskal fonctionne en sélectionnant d'abord l'arête de poids le plus faible qui ne crée pas de cycle. Ensuite, l'algorithme sélectionne l'arête de poids le plus faible suivante qui ne crée pas de cycle, et ainsi de suite. Ce processus se poursuit jusqu'à ce que tous les sommets soient connectés.
</p>

<br>
<br>

<b>
    Algorithme détaillé
</b>
<ol>
    <li>
        Trier les arêtes par poids croissant.
    </li>
    <li>
        Initialiser un ensemble de sommets vides.
    </li>
    <li>
        Pour chaque arête, dans l'ordre du poids croissant :
        <ul>
            <li>
                Si les deux sommets de l'arête ne sont pas dans le même ensemble de sommets :
                <ul>
                    <li>
                        Ajouter l'arête à l'arbre couvrant de poids minimum.
                    </li>
                    <li>
                        Union des ensembles de sommets contenant les deux sommets de l'arête.
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ol>

<br>

<b>
    Temps d'exécution
</b>
<br>
<p>
    Le temps d'exécution de l'algorithme de Kruskal est de O(E log E), où E est le nombre d'arêtes dans le graphe.
</p>

<br>

<b>
    Applications
</b>
<br>
<p>
    L'algorithme de Kruskal a de nombreuses applications, notamment :
    <br>
    <ul>
        <li>
            La conception de réseaux de télécommunications
        </li>
        <li>
            La construction de routes et de ponts
        </li>
        <li>
            La planification de circuits imprimés
        </li>
    </ul>
</p>
<br>

<b>
    Conclusion
</b>
<br>
<p>
    L'algorithme de Kruskal est un algorithme efficace pour la recherche d'arbre couvrant de poids minimum. Il est simple à comprendre et à implémenter, et il a un temps d'exécution rapide. L'algorithme de Kruskal a de nombreuses applications pratiques.
</p>

<br /><br />
<b>
Coder par &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <i>  Yasser Chenik </i>
<br />
Algorithm par : <i>  Youness </i>
</b>
