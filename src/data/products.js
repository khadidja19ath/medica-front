// Les produits viennent maintenant de l'API (MongoDB). Il reste ici les catégories et le format du prix.
export const categories = [
  { name: "Diagnostic", description: "Mesure et contrôle", icon: "activity" },
  { name: "Mobilier", description: "Aménagement médical", icon: "armchair" },
  { name: "Instruments", description: "Outils professionnels", icon: "stethoscope" },
  { name: "Consommables", description: "Produits à usage courant", icon: "package" }
];

export function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR").format(price) + " DA";
}
