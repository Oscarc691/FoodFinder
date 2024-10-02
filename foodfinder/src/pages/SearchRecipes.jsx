import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RecipeService from "../service/service";
import RecipeList from "../components/RecipeList";
import CategoryChoices from "../components/ui/CategoryChoices";
import NoResults from "../components/ui/NoResults";
import { RecipesSkeleton } from "../components/Skeleton";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const SearchRecipes = ({ categories }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const searchQuery = query.get("query");

  // fetches the search results based on the search query
  const fetchSearchResults = useCallback(async () => {
    if (searchQuery) {
      setLoading(true);
      try {
        // check if the search query is exactly one character
        if (searchQuery.length === 1) {
          const { meals } = await RecipeService.fetchSearchRecipes(
            "f=" + searchQuery
          );
          setRecipes(meals || []);
        } else {
          const { meals } = await RecipeService.fetchSearchRecipes(
            "s=" + searchQuery
          );
          setRecipes(meals || []);
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      } finally {
        setLoading(false);
      }
    }
  }, [searchQuery]);
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return (
    <header id="recipes">
      <div className="container">
        <div className="row">
          <div className="category__choices">
            {categories.map((category) => (
              <CategoryChoices category={category} />
            ))}
          </div>
          {recipes.length === 0 ? (
            <div className="no-result__wrapper">
              <NoResults />
            </div>
          ) : (
            <>
              <h1>Search Results for: {searchQuery}</h1>
              <hr />
              <div className="recipes">
                {loading
                  ? Array.from({ length: 4 }, (_, index) => (
                      <RecipesSkeleton key={index} />
                    ))
                  : recipes.map((recipe) => (
                      <RecipeList key={recipe.idMeal} recipe={recipe} />
                    ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default SearchRecipes;
