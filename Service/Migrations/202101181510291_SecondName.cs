namespace JobM_NET.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SecondName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "UserNameSecond", c => c.String(maxLength: 20));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "UserNameSecond");
        }
    }
}
