Voici le code source de mon application. J’ai trouvé quelques petits problèmes après le déploiement, voici la liste :

- Je me suis rendu compte que mon max length est à 100 dans mon évaluation, mais j’ai oublié de mettre une limite sur ma textbox.
  Résultat : une trop longue review cause une erreur, mais elle peut quand même être raccourcie et renvoyée.

- Mon captcha-v3 est bien configuré et mon login/register l’utilise, mais pour une raison obscure, l’icône a disparu.

- Mon système de parties incomplètes est un peu shaky. J’ai essayé de binder sur l’action de sortir/rafraîchir la page, mais parfois,
  ça log plus d’une partie incomplète.

- J’ai aussi donné mon lien à BEAUCOUP de monde, donc je me lave les mains du contenu des reviews qui vont se retrouver sur le site lors de la correction… 
  Désolé !


Voici les liens pour mon site, un user vous a été crée pour la partie admin.

https://apirest.w4-emile.vtinyhosting.site/admin/

user-Admin
user : sgod
Mdp : sgod1234 

https://react.w4-emile.vtinyhosting.site/