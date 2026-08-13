module.exports = function (eleventyConfig) {
  // Копируем картинки как есть
  eleventyConfig.addPassthroughCopy("src/img");

  // Коллекция новостей, отсортированная от новых к старым
  eleventyConfig.addCollection("news", (collectionApi) =>
    collectionApi.getFilteredByTag("news").sort((a, b) => b.date - a.date)
  );

  // Формат даты: dd.mm.yyyy
  eleventyConfig.addFilter("niceDate", (date) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return dd + "." + mm + "." + d.getFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
