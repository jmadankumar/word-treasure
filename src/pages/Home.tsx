import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import { Card, CardContent, Grid ,Link} from "@material-ui/core";
import supabase from "../lib/supabase-client";
import { Word } from "../types";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    const fetchWordCount = async () => {
      const { count } = await supabase
        .from<Word>("words")
        .select("*", { count: "exact" })
        .range(0, 0);
      setTotalWords(Number(count));
    };
    fetchWordCount();
  }, []);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
          <Card>
            <CardContent>
              <div className="text-xl font-bold  text-center mb-5">
                Total Words
              </div>
              <div className="text-5xl text-gray-500 text-center mb-5">
                {totalWords}
              </div>
              <div className="text-center">
                <Link component={RouterLink} to="/words">See words</Link>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
