require "test_helper"

class RecipeDetailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe_detail = recipe_details(:one)
  end

  test "should get index" do
    get recipe_details_url, as: :json
    assert_response :success
  end

  test "should create recipe_detail" do
    assert_difference('RecipeDetail.count') do
      post recipe_details_url, params: { recipe_detail: { ingredients: @recipe_detail.ingredients, instructions: @recipe_detail.instructions, recipe_id: @recipe_detail.recipe_id } }, as: :json
    end

    assert_response 201
  end

  test "should show recipe_detail" do
    get recipe_detail_url(@recipe_detail), as: :json
    assert_response :success
  end

  test "should update recipe_detail" do
    patch recipe_detail_url(@recipe_detail), params: { recipe_detail: { ingredients: @recipe_detail.ingredients, instructions: @recipe_detail.instructions, recipe_id: @recipe_detail.recipe_id } }, as: :json
    assert_response 200
  end

  test "should destroy recipe_detail" do
    assert_difference('RecipeDetail.count', -1) do
      delete recipe_detail_url(@recipe_detail), as: :json
    end

    assert_response 204
  end
end
