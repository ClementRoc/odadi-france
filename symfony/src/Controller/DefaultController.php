<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\NewsService;
use App\Service\MembersService;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="app_home", methods="GET")
     */
    public function home(NewsService $newsService): Response
    {
        return $this->render('home.html.twig', [
            'hotnews' => $newsService->getHotnews(1)[0]
        ]);
    }

    /**
     * @Route("/nos-actions", name="app_actions", methods="GET")
     */
    public function actions(): Response
    {
        return $this->render('actions.html.twig');
    }

    /**
     * @Route("/histoire", name="app_history", methods="GET")
     */
    public function history(MembersService $membersService): Response
    {
        return $this->render('history.html.twig', [
            'members' => $membersService->getMembers()
        ]);
    }

    /**
     * @Route("/contact", name="app_contact", methods="GET")
     */
    public function contact(MembersService $membersService): Response
    {
        return $this->render('contact.html.twig', [
            'members' => $membersService->getMembers()
        ]);
    }
}