using System.Web.Optimization;

namespace PracticeBI
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/Content/Plugins/amcharts").Include(
                         "~/Content/Plugins/amcharts/amcharts/amcharts.js",
                         "~/Content/Plugins/amcharts/amcharts/serial.js",
                         "~/Content/Plugins/amcharts/amcharts/themes/light.js",
                         "~/Content/Plugins/amcharts/amcharts/plugins/export/libs/FileSaver.js/FileSaver.js",
                         "~/Content/Plugins/amcharts/amcharts/plugins/export/libs/blob.js/blob.js",
                         "~/Content/Plugins/amcharts/amcharts/plugins/export/libs/fabric.js/fabric.min.js",
                         "~/Content/Plugins/amcharts/amcharts/plugins/export/libs/jszip/jszip.js",
                         "~/Content/Plugins/amcharts/amcharts/plugins/export/export.min.js"

                         ));


            bundles.Add(new ScriptBundle("~/Content/Plugins/datatables").Include(
                     "~/Content/Plugins/datatables/jquery.dataTables.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/Content/Plugins/alasql").Include(
                 "~/Content/Plugins/alasql/alasql.min.js"
                         ));      
            


            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/Plugins/datatables/css").Include(
                    "~/Content/Plugins/datatables/jquery.dataTables.min.css"
                    ));

            bundles.Add(new StyleBundle("~/Content/Plugins/amcharts/amcharts/plugins/export/export").Include(
               "~/Content/Plugins/amcharts/amcharts/plugins/export/export.css"
                       ));


        }
    }
}
