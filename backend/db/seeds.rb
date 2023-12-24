user = User.find(1)
recipes = [
  { title: "テストレシピ1", description: "説明1", image_path: "image1.jpg", user: user },
]

recipes.each do |recipe_data|
  recipe = Recipe.new(title: recipe_data[:title], description: recipe_data[:description], user: user)

  image_path = Rails.root.join('app', 'assets', 'images', recipe_data[:image_path])
  puts "imagepath #{image_path}"
  
  if File.exist?(image_path)
    recipe.image = File.open(image_path) # CarrierWave用のアタッチ方法
  else
    puts "画像が見つかりません: #{image_path}"
  end

  recipe.save
end

