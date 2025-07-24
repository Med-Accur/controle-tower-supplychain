import React, { useState } from "react";
import CustomBarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";
import CustomLineChart from "../components/charts/LineChart";
import StackedBarChart from "../components/charts/StackedBarChart";
import ComboChart from "../components/charts/ComboChart";

const chartConfigs = {
  get_otif: {
    typeMap: {
      
      donut: (props) => (
        <DonutChart
          {...props}
          dataKey="otif"
          nameKey="jour"
          title="OTIF"
          xAxisLabel="Jour"
          yAxisLabel="Taux OTIF (%)"
        />
      ),
    },
  },
  get_cout_par_jour_traitement: {
    typeMap: {
      line: (props) => (
        <CustomLineChart
          {...props}
          xKey="jour"
          yKey="cout"
          title="Coût par jour de traitement"
          xAxisLabel="Jour"
          yAxisLabel="Coût (€)"
        />
      ),
      combo: (props) => (
        <ComboChart
          {...props}
          xKey="jour"
          barKey="cout"
          lineKey="cout"
          title="Coût par jour de traitement"
          xAxisLabel="Jour"
          yAxisLabel="Coût (€)"
        />
      ),
    },
  },
  get_taux_annulation: {
    typeMap: {
      donut: (props) => (
        <DonutChart
          {...props}
          dataKey="taux_annulation"
          nameKey="jour"
          title="Taux d’annulation"
          xAxisLabel="Jour"
          yAxisLabel="Taux (%)"
        />
      ),
      stackedBar: (props) => (
        <StackedBarChart
          {...props}
          xKey="jour"
          yKeys={["taux_annulation"]}
          colors={["#8884d8"]}
          title="Taux d’annulation"
          xAxisLabel="Jour"
          yAxisLabel="Taux (%)"
        />
      ),
    },
  },
  get_duree_cycle_moyenne: {
  typeMap: {
    line: (props) => (
      <CustomLineChart
        {...props}
        xKey="jour"
        yKey="duree_moyenne"
        title="Durée moyenne du cycle"
        xAxisLabel="Jour"
        yAxisLabel="Durée (jours)"
      />
    ),
  },
},

  get_nb_commandes: {
    typeMap: {
      combo: (props) => (
        <ComboChart
          {...props}
          xKey="jour"
          barKey="nb_commandes"
          lineKey="nb_commandes"
          title="Nombre de commandes"
          xAxisLabel="Jour"
          yAxisLabel="Nb commandes"
        />
      ),
      stackedBar: (props) => (
        <StackedBarChart
          {...props}
          xKey="jour"
          yKeys={["nb_commandes"]}
          colors={["#82ca9d"]}
          title="Nombre de commandes"
          xAxisLabel="Jour"
          yAxisLabel="Nb commandes"
        />
      ),
    },
  },
  get_taux_retards: {
    typeMap: {
      donut: (props) => (
        <DonutChart
          {...props}
          dataKey="taux_retard"
          nameKey="jour"
          title="Taux de retard"
          xAxisLabel="Jour"
          yAxisLabel="Taux (%)"
        />
      ),
       
    },
  },
  get_avg_changelog_par_commande: {
    typeMap: {
      line: (props) => (
        <CustomLineChart
          {...props}
          xKey="jour"
          yKey="avg_changelog"
          title="Changelog moyen par commande"
          xAxisLabel="Jour"
          yAxisLabel="Nb changements"
        />
      ),
    },
  },
};

export default chartConfigs;
