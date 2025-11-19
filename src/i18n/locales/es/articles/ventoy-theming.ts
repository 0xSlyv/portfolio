const secretWitchAnime = {
  title: "Temas en Ventoy",
  category: "Technology",
  date: "18/11/2025",
  content: `
Ventoy es una herramienta de código abierto que te permite tener una unidad USB con múltiples archivos ISO. También puedes colocar WIM/IMG/VHD(x)/EFI según su página, pero yo solo la he usado con ISO.

La he usado como reemplazo de Rufus y es muy útil, la recomiendo bastante. La interfaz no es muy bonita… así que la estuve usando así por un tiempo, luego curioseando entre los archivos encontré que existe una carpeta THEME que contiene los elementos de la UI de Ventoy, lo que te permite personalizar el fondo, los elementos y los colores. Aquí dejo parte de lo que aprendí sobre esto.

Primero quiero mencionar que en la página oficial de Ventoy existe una sección de plugins, pero aquí escribiré sobre cómo lo hice yo.

En la carpeta grub/theme/ventoy puedes encontrar todo lo que aparece en pantalla: el menú, las etiquetas, los colores, la barra de desplazamiento e incluso la barra de selección. Todo vive ahí como una mezcla de archivos de configuración y elementos PNG. Y como todo sigue el lenguaje de temas de GRUB, modificar cosas se vuelve sorprendentemente manejable, incluso si nunca has tocado un tema de GRUB antes.

Aquí tienes una pequeña guía sobre cómo funcionan las partes del archivo de configuración:

• bloque boot_menu:
→ Define dónde aparece el menú completo usando porcentajes para left, top, width y height. También controlas el espaciado, padding, altura de los ítems y los iconos que aparecen junto a las entradas ISO. Ventoy lee esos valores en tiempo real cuando dibuja la interfaz.

• left = 6% + top = 28% + width = 60% + height = 55%
→ Calcula todo relativo a la resolución de pantalla, así que el resultado se escala perfectamente en distintos monitores. De esta forma puedes mover el menú a cualquier parte manteniendo las proporciones.

• menu_pixmap_style
→ Estas son las imágenes usadas para los marcos, los elementos resaltados, la terminal y los sliders. Archivos como menu_*.png, select_*.png o terminal_box_*.png funcionan como piezas modulares del skin. Si los reemplazas o recoloreas, toda la interfaz de arranque cambia por completo. Como no aplica suavizado, los bordes de 1px o los bloques pastel suaves se ven muy limpios al cargarlos.

• item_color, selected_item_color, item_height, item_padding, item_spacing
→ Estos definen el estilo del texto y la lógica de espaciado. Trata cada entrada como un bloque, así que el padding afecta al espacio interno, mientras que item_height controla directamente lo alto que es cada fila seleccionable. Los colores aceptan RGB en hex, así que puedes escribir literalmente un suave #cba6f7 lila o #f2e9e1 crema para que coincida con tu tema.

• selected_item_pixmap_style
→ Te permite asignar un PNG personalizado para el ítem seleccionado. Esto es lo que crea barras brillantes, subrayados pastel o rectángulos redondeados sutiles detrás del ítem activo. Si diseñas tu PNG a la densidad exacta que quieras, tendrás un resultado impecable.

• scrollbar + scrollbar_width + scrollbar_thumb
→ Misma estructura que los bloques del menú. scrollbar define la base, scrollbar_thumb el elemento desplazable y scrollbar_width determina el grosor. Como Ventoy hereda la lógica de GRUB, puedes hacer la barra de desplazamiento una línea pastel fina o un panel más grueso.

Hay otras capas que no profundicé en este artículo, pero espero que esto proporcione una buena base para crear un tema básico para crear un menú personalizado.
  `
} as const;

export default secretWitchAnime;